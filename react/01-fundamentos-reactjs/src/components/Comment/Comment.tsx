import { ThumbsUp, Trash } from 'phosphor-react';

import { Avatar } from '../Avatar/Avatar';

import styles from './Comment.module.css';

type CommentProps = {
  content: string;
};

export function Comment(props: CommentProps) {
  return (
    <div className={styles.comment}>
      <Avatar src='https://github.com/Rosivaldo-Lucas.png' hasBorder={false} />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Rosivaldo Lucas</strong>
              <time title='11 de Maio às 08:13h' dateTime='2022-05-11 08:13:50'>Cerca de 2h atrás</time>
            </div>

            <button title='Deletar comentário'>
              <Trash size={24} />
            </button>
          </header>

          <p>
            {props.content}
          </p>
        </div>

        <footer>
          <button>
            <ThumbsUp size={20} />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>


    </div>
  );
}
