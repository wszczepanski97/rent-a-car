import { FC } from "react";
import { CardRow } from "ui";
import { SolutionsCard } from "./molecules";

const SolutionsCardRow: FC = () => (
  <CardRow>
    <SolutionsCard
      photoProps={{ src: "/images/Car-1.webp", alt: "Car-1" }}
      paragraphProps={{
        paragraphText: `Newton myślał, że światło składało się z cząstek, a potem zostało to odkryte`,
      }}
      titleProps={{ title: "Jedno źródło prawdy" }}
    />
    <SolutionsCard
      photoProps={{ src: "/images/Car-2.webp", alt: "Car 2" }}
      paragraphProps={{
        paragraphText: `"Mechanika kwantowa" jest opisem zachowania materii`,
      }}
      titleProps={{ title: `Najszybszy sposób na zorganizowanie` }}
    />
    <SolutionsCard
      photoProps={{ src: "/images/Car-3.webp", alt: "Car 3" }}
      paragraphProps={{
        paragraphText: `Opisuje wszechświat składający się z poruszających się ciał`,
      }}
      titleProps={{ title: `Najszybszy sposób na podjęcie działań` }}
    />
    <SolutionsCard
      photoProps={{ src: "/images/Car-4.png", alt: "Car 4" }}
      paragraphProps={{
        paragraphText: `W końcu uzyskali spójny opis zachowania poruszających się ciał we wszechświecie.`,
      }}
      titleProps={{ title: `Pracuj lepiej razem` }}
    />
  </CardRow>
);

export default SolutionsCardRow;
