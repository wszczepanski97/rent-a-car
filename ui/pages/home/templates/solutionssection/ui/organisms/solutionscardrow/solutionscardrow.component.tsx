import { SolutionsCard } from "./molecules";
import { CardRow } from "../../../../../../../common";
import styles from "./solutionscardrow.module.css";
import { CardType } from "../../../../../../../common/molecules/card/card.component";

const SolutionsCardRow = () => (
  <CardRow className={styles.solutionsCards_Container}>
    <SolutionsCard
      photoProps={{
        src: "/images/Car-1.png",
        alt: "Car-1",
      }}
      paragraphProps={{
        paragraphText: `Newton thought that 
      light was made up of 
      particles, but then it 
      was discovered `,
      }}
      titleProps={{ title: "A single source of truth" }}
    />
    <SolutionsCard
      photoProps={{
        src: "/images/Car-2.png",
        alt: "Car-2.png",
      }}
      paragraphProps={{
        paragraphText: `“Quantum mechanics” 
      is the description of the 
      behaviour of matter`,
      }}
      titleProps={{
        title: `Fastest way to 
      organize`,
      }}
    />
    <SolutionsCard
      photoProps={{
        src: "/images/Car-3.png",
        alt: "Car-3.png",
      }}
      paragraphProps={{
        paragraphText: `They describe a 
      universe consisting of 
      bodies moving`,
      }}
      titleProps={{
        title: `Fastest way to 
      take action`,
      }}
    />
    <SolutionsCard
      photoProps={{
        src: "/images/Car-4.png",
        alt: "Car-4.png",
      }}
      paragraphProps={{
        paragraphText: `They finally obtained 
      a consistent description 
      of the behaviour `,
      }}
      titleProps={{
        title: `Work better 
      together`,
      }}
    />
  </CardRow>
);

export default SolutionsCardRow;
