import { useState } from 'react';
import { ThumbsUp, Trash } from 'phosphor-react';

import { Avatar } from '../Avatar/Avatar';

import styles from './Comment.module.css';

type CommentProps = {
  content: string;
  onDeleteComment: (comment: string) => void;
};

export function Comment(props: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1;
    });
  }

  function handleDeleteComment() {
    props.onDeleteComment(props.content);
  }

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

            <button onClick={handleDeleteComment} title='Deletar comentário'>
              <Trash size={24} />
            </button>
          </header>

          <p>
            {props.content}
          </p>
        </div>

        <footer>
          <button
            onClick={handleLikeComment}
          >
            <ThumbsUp size={20} />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>


    </div>
  );
}
