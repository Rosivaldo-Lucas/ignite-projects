import styles from './Avatar.module.css';

type AvatarProps = {
  src: string;
  hasBorder?: boolean;
};

export function Avatar({ src, hasBorder = true }: AvatarProps) {

  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatarWithoutBorder}
      src={src}
    />
  );

}
