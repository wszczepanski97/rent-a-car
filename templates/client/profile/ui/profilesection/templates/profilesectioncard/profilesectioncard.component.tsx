import { ProfilePageProps } from "pages/client/profile";
import { FC } from "react";
import { Card, CardType } from "ui";
import {
  ProfileDataColumn,
  ProfilePhotoColumn,
  ProfileSectionCardContainer,
  ProfileSectionCardHeader,
} from "./ui";
import styles from "./profilesectioncard.module.scss";

const ProfileSectionCard: FC<ProfilePageProps> = ({ user }) => (
  <Card type={CardType.CUSTOM} className={styles.ProfileSectionCard}>
    <ProfileSectionCardHeader />
    <ProfileSectionCardContainer>
      <ProfileDataColumn user={user} />
      <ProfilePhotoColumn
        profile={{ clientId: user.IdKlienci, userId: user.IdUzytkownicy }}
      />
    </ProfileSectionCardContainer>
  </Card>
);

export default ProfileSectionCard;
