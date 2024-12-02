"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import DescrizioneElementoCarosello from "./descrizioneElementoCarosello";

export function ServiziCarosello() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full">
      <h2 className="max-w-7xl text-center pl-4 mx-auto text-2xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        SERVIZI
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const descrizioni=[
    "Descrizione della crioterapia There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. ",
    "Descrizione della crioterapia There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are",
    "f Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasum is therefore always free from repetition, injected humour, or non-characteristic words etc. ",
    "Descrizione della crioterapia There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks rted Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. ",
    "Descrizione della crioterapia There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are",
    "f Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasum is therefore always free from repetition, injected humour, or non-characteristic words etc. ",
]

const data = [
   {
    title: "Crioterapia",
    src: "/crioterapia.jpeg",
    content: <DescrizioneElementoCarosello foto="/crioterapia.jpeg" descrizione={descrizioni[0]} />,
  },
  {
    title: "Massaggio sportivo",
    src: "/mSportivo.png",
    content: <DescrizioneElementoCarosello foto="/mSportivo.png" descrizione={descrizioni[1]}/>,
  },
  {
    title: "Massaggio Decontretturante",
    src: "/mDecontretturante.png",
    content: <DescrizioneElementoCarosello foto="/mDecontretturante.png" descrizione={descrizioni[2]}/>,
  },
  {
    title: "Massaggio Miofasciale",
    src: "/mMiofasciale.jpeg",
    content: <DescrizioneElementoCarosello foto="/mMiofasciale.jpeg" descrizione={descrizioni[3]}/>,
  },
  {
    title: "Kinesio Taping",
    src: "/kTaping.jpg",
    content: <DescrizioneElementoCarosello foto="/kTaping.jpg" descrizione={descrizioni[4]}/>,
  },

  {
    title: "Lezioni di Personal Tranier",
    src: "/personalTrainer.jpg",
    content: <DescrizioneElementoCarosello foto="/personalTrainer.jpg" descrizione={descrizioni[5]}/>,
  },
];



