/* 
Context: You’re part of a research team that has found a new mysterious organism at the bottom
of the ocean near hydrothermal vents. Your team names the organism, Pila aequor (P. aequor), 
and finds that it is only comprised of 15 DNA bases. The small DNA samples and frequency at 
which it mutates due to the hydrothermal vents make P. aequor an interesting specimen to study.
, P. aequor cannot survive above sea level and locating P. aequor in the deep sea is difficult
 and expensive. Your job is to create objects that simulate the DNA of P. aequor for your 
 research team to study.
*/

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Created a factory function that should return an object containing specimen number and dna
function pAequorFactory(num, dnaArray) {
  return {
    specimenNum: num,
    dna: dnaArray,

    // Created mutate function to alter DNA of a base at random to different base
    mutate() {
      const randIndex = Math.floor(Math.random() * this.dna.length);
      newBase = returnRandBase();
      while (this.dna[randIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randIndex] = newBase;
      return this.dna;
    },

    // Create method to compare one dna object of this factory fucntion to another
    compareDNA(otherPAequor) {
      let matches = 0;
      for (let i = 0; i < this.dna.length; i++) {
          if (this.dna[i] === otherPAequor.dna[i]) {
            matches ++;
          }
        }

      const similarityPercentage = (matches / 15) * 100;
      console.log(`specimen #${this.specimenNum} and specimen #${otherPAequor.specimenNum} have ${similarityPercentage}% DNA in common`);
    },

    willLikelySurvive() {
      let countGandC = 0;
      this.dna.forEach(base => {
        if (base === 'G' || base === 'C') {
          countGandC++;
        }
      })

      percentageGandC = (countGandC / 15) * 100
      if (percentageGandC > 60) {
        return true;
      } else {
        return false;
      }
    }
  }
}

// Tested factory function
const weirdFish = pAequorFactory(1, mockUpStrand());
console.log(weirdFish.dna); // Prints out the fish object created above

// Tested mutate method
console.log(weirdFish.mutate()); // Changes dna at random index within this.dna

// Tested compareDNA method
const tinyWhale = pAequorFactory(2, mockUpStrand());
weirdFish.compareDNA(tinyWhale); // Returns % similarity

// Tested willLikelySurvive method
console.log(tinyWhale.willLikelySurvive());

// Create 30 instances of pAeqor that can survive natural neivonrment, storing them in an array
let survivors = [];
let id = 1;

while (survivors.length < 30) {
  let newOrg = pAequorFactory(id, mockUpStrand())
  if (newOrg.willLikelySurvive()) {
    survivors.push(newOrg)
  }
  id++;
}
