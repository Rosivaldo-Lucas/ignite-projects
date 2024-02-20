import { ImgHTMLAttributes } from 'react';

import styles from './Avatar.module.css';

type AvatarProps = ImgHTMLAttributes<HTMLImageElement> & {
  hasBorder?: boolean;
};

export function Avatar({ hasBorder = true, ...props }: AvatarProps) {

  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatarWithoutBorder}
      {...props}
    />
  );

}
