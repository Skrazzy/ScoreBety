import React, { useState, useEffect, useRef } from "react";
import { NotiBadge } from './notiBadge.jsx';
import './notis.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Manipulation } from "swiper/modules";
import "swiper/css";

export function SwiperNotis({ data, currentLang }) {


  let setNamesArray = [];

  
  data.map(c => c.games.map(c => {
    setNamesArray.push(c.name)
}))



  const names = [
    "Luiz", "Lula",
    "João", "Joca",
    "Felipe", "Lipe",
    "Gabriel", "Gabi",
    "Lucas", "Luquinhas",
    "Matheus", "Teteu",
    "Bruno", "Bru",
    "Ricardo", "Rico",
    "Gustavo", "Gus",
    "Carlos", "Cacá",
    "Diogo", "Digo",
    "Fernando", "Nando",
    "Thiago", "Tiago", "Thia",
    "Vitor", "Vitinho",
    "Jorge", "Jorginho",
    "Alexandre", "Xande",
    "Leandro", "Léo",
    "Cássio", "Cassinho",
    "Cauê", "Cau",
    "Rafael", "Rafa",
    "Rodrigo", "Digo",
    "Henrique", "Rique",
    "Murilo", "Muri",
    "Vinícius", "Vini",
    "Yuri", "Yu",
    "Wesley", "Wes",
    "Victor", "Vic",
    "Caio", "Cai",
    "André", "Dé",
    "Pedro", "Peu",
    "Eduardo", "Dudu",
    "Leonardo", "Léo",
    "Daniel", "Dani",
    "Paulo", "Paulinho",
    "Igor", "Igão",
    "Otávio", "Tavinho",
    "César", "Cesinha",
    "Arthur", "Tu",
    "Samuel", "Sam",
    "Renato", "Rê",
    "Willian", "Will",
    "Marcos", "Marquinho",
    "Isaac", "Zac",
    "Douglas", "Doug",
    "Júlio", "Ju",
    "Fabrício", "Fá",
    "Márcio", "Marcinho",
    "Roberto", "Beto",
    "Guilherme", "Gui",
    "Fábio", "Fabinho",
    "Rogério", "Roger",
    "José", "Zé",
    "André", "Dedé",
    "Antônio", "Tonho",
    "Marcelo", "Celo",
    "Cláudio", "Cau",
    "Sérgio", "Serginho",
    "Maria", "Mari",
    "Ana", "Aninha",
    "Beatriz", "Bia",
    "Julia", "Juju",
    "Luiza", "Lu",
    "Larissa", "Lari",
    "Isabela", "Bela",
    "Fernanda", "Nanda",
    "Gabriela", "Gabi",
    "Carolina", "Carol",
    "Amanda", "Mandi",
    "Bruna", "Bru",
    "Camila", "Cami",
    "Rafaela", "Rafa",
    "Leticia", "Leti",
    "Vitória", "Vivi",
    "Mariana", "Mari",
    "Daniela", "Dani",
    "Stefany", "Stef",
    "Alice", "Lice",
    "Eduarda", "Duda",
    "Clara", "Clarinha",
    "Jéssica", "Jess",
    "Nathalia", "Nati",
    "Sabrina", "Bri",
    "Samantha", "Sam",
    "Vanessa", "Nessa"
  ];
  const createRandomName = () => names[Math.floor(Math.random() * names.length)];

  const [gamesA, setGamesA] = useState(['FortuneTiger'])

  useEffect(() => {




    setGamesA(setNamesArray);

  }, [data])




  const chooseType = () => (Math.random() <= 1 / 20 ? 'gift' : 'pix');

  const [fudido, setFudido] = useState(gamesA[Math.floor(Math.random() * gamesA.length)])
  const generateBadgeData = (index, games) => {
    let randomGame = setNamesArray[Math.floor(Math.random() * setNamesArray.length)];

    return {
      type: chooseType(),
      name: createRandomName(index),
      value: (Math.random() * 1000),
      game: randomGame,
    };
  };
  


  const [items, setItems] = useState([...new Array(10)].map((_, index) => generateBadgeData(index, gamesA)));
  const swiperRef = useRef(null);


  let uEf = 0
  useEffect(() => {

    uEf++

    if (uEf > 1) {


      setTimeout(() => {

        setItems(prevItems => {
          const newItems = [...prevItems];
          for (let i = 0; i <= 4; i++) {
            newItems[i] = generateBadgeData(i, gamesA);
          }
          return newItems;
        });

        setInterval(() => {
          setItems(prevItems => {
            const newItems = [...prevItems];
            for (let i = 0; i <= 4; i++) {
              newItems[i] = generateBadgeData(i , gamesA);
            }
            return newItems;
          });

        }, 2000 * 10)

      }, 2000 * 6)

      setTimeout(() => {

        setItems(prevItems => {
          const newItems = [...prevItems];
          for (let i = 5; i <= 9; i++) {
            newItems[i] = generateBadgeData(i, gamesA);
          }
          return newItems;
        })

        setInterval(() => {
          setItems(prevItems => {
            const newItems = [...prevItems];
            for (let i = 5; i <= 9; i++) {
              newItems[i] = generateBadgeData(i, gamesA);
            }
            return newItems;
          });
        }, 2000 * 10)

      }, 2000*2)
    }

  }, []);



  useEffect(() => {
    const swiper = swiperRef.current;

    if (swiper) {

      const checkSlideNext = () => {
        if (swiper.slides[7]?.classList.contains('swiper-slide-next')) {

        }
        if (swiper.slides[3]?.classList.contains('swiper-slide-next')) {
          /*  */
        }
      };

      swiper.on('slideChangeTransitionStart', checkSlideNext);

      return () => {
        if (swiper) {
          swiper.off('slideChangeTransitionStart', checkSlideNext);
        }
      };
    }

    // The dependency array is intentionally left empty because we only want to set up the subscription once
  }, []);



  return (
    <section id="swiperNotis">
      <Swiper
      className="swp-notis"
        modules={[Autoplay, Manipulation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={"auto"}
        speed={2000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        loop={true}
        allowTouchMove={false}
        preventClicks={true}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <NotiBadge {...item} items={items} index={index} currentLang={currentLang}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
