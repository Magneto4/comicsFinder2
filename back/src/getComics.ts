const axios = require("axios");
const cheerio = require("cheerio");

async function getCharComics(comics: Set<string>, name: string, type: string) {
  let newComics = new Set<string>();
  let URL =
    "https://marvel.fandom.com/wiki/Category:" +
    name.replace(/ /g, "_") +
    "/" +
    type;

  while (1) {
    const html = await axios.get(URL).catch((err) => {
      console.log("Missing data");
      return comics;
    });
    const $ = cheerio.load(html.data);
    const list = $("a.category-page__member-link");
    list.each(function (i, elem) {
      if (!comics || comics.has($(elem).text())) {
        newComics.add($(elem).text());
      }
    });
    const next = $("div.category-page__pagination");
    if (next.length == 0) break;
    const nextButtons = $("div.category-page__pagination").find("a");

    var isNext = false;
    nextButtons.each(function (i, elem) {
      if ($(elem).text().includes("Next")) {
        URL = $(elem).attr("href");
        isNext = true;
      }
    });
    if (!isNext) break;
  }

  return newComics;
}

async function findComics(comics: Set<string>, list: string[], type: string) {
  if (list.length) {
    for (var name of list) {
      comics = await getCharComics(comics, name, type);
    }
  }
  return comics;
}

export async function getComics(
  characters: string[],
  writers: string[],
  pencilers: string[],
  inkers: string[],
  colorists: string[],
  letterers: string[],
  editors: string[]
) {
  let comics: Set<string>;

  comics = await findComics(comics, characters, "Appearances");
  comics = await findComics(comics, writers, "Writer");
  comics = await findComics(comics, pencilers, "Penciler");
  comics = await findComics(comics, inkers, "Inker");
  comics = await findComics(comics, colorists, "Colorist");
  comics = await findComics(comics, letterers, "Letterer");
  comics = await findComics(comics, editors, "Editor");

  return Array.from(comics);
}
