import axios from "axios";
import cheerio from "cheerio";

export default async function goFreeSMS() {
  try {
    const url = "https://gofreesms.com/";
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    const numbers = [];

    $(".number-box").each((i, el) => {
      const num = $(el).find(".number").text().trim();
      const link = $(el).find("a").attr("href");

      numbers.push({
        source: "gofreesms",
        number: num,
        id: num.replace(/\D/g, ""),
        link: "https://gofreesms.com" + link
      });
    });

    return numbers;
  } catch (e) {
    return [];
  }
}
