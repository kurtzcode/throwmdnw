const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");

const path = "./data.json";
const date = moment().format();

const data = {
  date: date,
};

const git = simpleGit();

jsonfile.writeFile(path, data, async (err) => {
  if (err) {
    console.error("Erro ao escrever o arquivo:", err);
    return;
  }

  console.log("Arquivo salvo com sucesso!");

  try {
    await git.add(path);

    await git.commit(`update: data.json @ ${date}`);

    console.log("Alterações commitadas com sucesso!");

    // Trecho da imagem adicionado abaixo
    simpleGit().add([path]).commit(date, { '--date': date }).push();
  } catch (gitErr) {
    console.error("Erro ao realizar commit:", gitErr);
  }
});
