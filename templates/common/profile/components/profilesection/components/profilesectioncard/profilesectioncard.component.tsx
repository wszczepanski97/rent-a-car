import type { FC } from "react";
import { useProfileContext } from "templates/common/profile/context/profile.context.hook";
import Card from "ui/molecules/card";
import { CardType } from "ui/molecules/card/cardtype.enum";
import Modal from "../../../modal/modal.component";
import ProfileDataColumn from "./components/profiledatacolumn/profiledatacolumn.component";
import ProfilePhotoColumn from "./components/profilephotocolumn/profilephotocolumn.component";
import ProfileSectionCardContainer from "./components/profilesectioncardcontainer/profilesectioncardcontainer.component";
import ProfileSectionCardHeader from "./components/profilesectioncardheader/profilesectioncardheader.component";
import styles from "./profilesectioncard.module.scss";

const ProfileSectionCard: FC = () => {
  const { modalOpen } = useProfileContext();
  return (
    <>
      <Card type={CardType.CUSTOM} className={styles.profileSectionCard}>
        <ProfileSectionCardHeader />
        <ProfileSectionCardContainer>
          <ProfileDataColumn />
          <ProfilePhotoColumn />
        </ProfileSectionCardContainer>
      </Card>
      {modalOpen && <Modal />}
    </>
  );
};

export default ProfileSectionCard;
