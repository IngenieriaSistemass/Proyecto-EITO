import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function LetterEncrypt({ word, mleftinicial = 180, transicionTime = 2, randCar, tickCambioletra = 150 }) {
  const [marginleft, setMarginleft] = useState(mleftinicial);
  const [caracterRandom, setCaracterRandom] = useState(randCar || ['$', "%", "#", "H", "J", "P", "0"]);
  const [newText, setNewText] = useState('');

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    let contaciclos = 0;
    const myInterval = setInterval(() => {
      let temptext = '';
      let trozopalabra = '';

      for (let i = contaciclos; i < word.length; i++) {
        let x = getRandomInt(0, caracterRandom.length - 1);
        temptext += caracterRandom[x];
      }

      for (let i = 0; i < contaciclos; i++) {
        trozopalabra += word[i];
      }

      setNewText(trozopalabra + temptext);
      contaciclos++;

      if (contaciclos > word.length) {
        clearInterval(myInterval);
      }
    }, tickCambioletra);

    return () => {
      clearInterval(myInterval);
    };
  }, [word, caracterRandom, tickCambioletra]);

  return (
    <p className="text-6xl font-extrabold text-white/90 animate-fade-in" style={{
      marginLeft: `${marginleft}px`,
      transition: `margin-left ${transicionTime}s`
    }}>{newText}</p>
  );
}

LetterEncrypt.propTypes = {
  word: PropTypes.string.isRequired,
  mleftinicial: PropTypes.number,
  transicionTime: PropTypes.number,
  randCar: PropTypes.array,
  tickCambioletra: PropTypes.number
};

export default LetterEncrypt;
