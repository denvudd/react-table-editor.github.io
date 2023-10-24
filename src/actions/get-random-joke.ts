import axios from "axios";

export const getRandomJoke = async () => {
  try {
    const { data } = await axios.get(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"
    );

    return data.joke as string;
  } catch (error: unknown) {
    return 'Eight bytes walk into a bar.\nThe bartender asks, "Can I get you anything?"\n"Yeah," reply the bytes.\n"Make us a double."';
  }
};
