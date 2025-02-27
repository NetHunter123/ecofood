"use server";

import fs from "fs/promises";
import path from "path";
import sharp from "sharp"; // не забудьте встановити бібліотеку sharp

const paths = {
  paths: {
    sm: ["/uploads/sm/1730658009169-1.png", "/uploads/sm/1730658009215-2.png"],
    md: ["/uploads/md/1730658009169-1.png", "/uploads/md/1730658009215-2.png"],
    thumbnails: [
      "/uploads/thumbnails/1730658009169-1.png",
      "/uploads/thumbnails/1730658009215-2.png",
    ],
  },
};

async function checkFilesExist({ paths }) {
  let results = true;

  for (const [category, files] of Object.entries(paths)) {
    results = await Promise.all(
      files.map(async (filePath) => {
        try {
          // Отримуємо абсолютний шлях файлу
          const absolutePath = path.join(process.cwd(), "public", filePath);

          // Перевіряємо, чи файл існує
          // console.log("try check exist file",filePath)
          await fs.access(absolutePath);
        } catch {
          // console.log("try check exist file",filePath)
          return false;
        }
      }),
    );
  }

  return results;
}

export async function fileDelete(filesPath) {
  console.log("Delete start");
  // const formData = await request.formData();
  try {
    // const { filesPath } = await request.json();

    if (!filesPath) {
      throw new Error("Необхідно коректно передати картинку для видалення");
    }

    const filesExist = await checkFilesExist(filesPath);
    if (!filesExist) {
      throw new Error("Не існує файл(и) які потрібно видалити");
    }

    for (const [category, files] of Object.entries(filesPath.paths)) {
      await Promise.all(
        files.map(async (filePath) => {
          try {
            // Отримуємо абсолютний шлях файлу
            const absolutePath = path.join(process.cwd(), "public", filePath);

            await fs.unlink(absolutePath);
          } catch (e) {
            console.log("catch dell file", filePath);
            throw new Error(`Не вдалося видалити файл ${filePath}:`, e);
          }
        }),
      );
    }

    return { success: "Файли успішно видалені" };
  } catch (e) {
    console.error(e);
    return { error: "Помилка при видаленні зображеннь", details: e.message };
  }
}

export async function fileUpload(file) {
  console.log("Start upload");
  console.log("File Upload", file);
  // const formData = await req.formData();
  // const files = formData.getAll("filesImg");
  const files = [file];
  const uploadPaths = { sm: [], md: [], thumbnails: [] };
  await fs.mkdir(path.join("./public/uploads/images"), { recursive: true });

  try {
    if (!files || !files.length) {
      throw new Error("Не передано картинки для збереження");
    }

    for (const file of files) {
      if (file && !file.type.startsWith("image/")) {
        throw new Error(
          "Дозволено завантажувати тільки картинки, перевірте вибрані файли",
        );
      }
    }

    for (const file of files) {
      // Унікальне ім'я для файлу
      const uniqueName = `${Date.now()}-${file.name}`;

      // Буфер зображення
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Визначення шляхів
      const uploadDir = "./public/uploads/images";
      const paths = {
        sm: path.join(uploadDir, "sm", uniqueName),
        md: path.join(uploadDir, "md", uniqueName),
        thumbnails: path.join(uploadDir, "thumbnails", uniqueName),
      };

      // Створення директорій, якщо вони не існують
      await fs.mkdir(path.join(uploadDir, "sm"), { recursive: true });
      await fs.mkdir(path.join(uploadDir, "md"), { recursive: true });
      await fs.mkdir(path.join(uploadDir, "thumbnails"), { recursive: true });

      // Зміна розмірів зображень та запис у відповідні директорії
      await sharp(buffer)
        .resize(800) // Приклад розміру для md
        .toFile(paths.md);
      await sharp(buffer)
        .resize(400) // Приклад розміру для sm
        .toFile(paths.sm);
      await sharp(buffer)
        .resize(150) // Приклад розміру для thumbnails
        .toFile(paths.thumbnails);

      // Додавання URL до відповідного формату в об'єкт uploadPaths
      uploadPaths.sm.push(`/uploads/images/sm/${uniqueName}`);
      uploadPaths.md.push(`/uploads/images/md/${uniqueName}`);
      uploadPaths.thumbnails.push(`/uploads/images/thumbnails/${uniqueName}`);
    }

    // Повернення JSON з шляхами
    return { paths: uploadPaths };
  } catch (e) {
    console.error(e);
    return { error: "Помилка при збереженні картинок", details: e.message };
  }
}
