import React from "react";
import scss from "./TextWriteWelcome.module.scss";
import { Typewriter } from "react-simple-typewriter";

const TextWriteWelcome = () => {
  const welcome = [
    "Добро пожаловать.",
    "Миллионы фильмов, сериалов и людей. Исследуйте сейчас.",
    "Откройте для себя новое кино каждый день.",
    "Смотрите то, что любят миллионы.",
    "Ваш гид в мире фильмов и сериалов.",
    "Начните своё путешествие в кино прямо сейчас.",
  ];

  return (
    <Typewriter
      className={scss.title}
      words={welcome}
      loop={true}
      cursor={true}
      cursorStyle="|"
      typeSpeed={80}
      deleteSpeed={10}
      delaySpeed={2700}
    />
  );
};

export default TextWriteWelcome;
