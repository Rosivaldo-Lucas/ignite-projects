import { Avatar } from '../Avatar/Avatar';
import { Comment } from '../Comment/Comment';
import styles from './Post.module.css';

export type PostProps = {
  id: number,
  author: {
    name: string,
    role: string,
    avatar_url: string,
  };
  contents: {
    type: string,
    content: string,
  }[]
  publishedAt: Date
};

export function Post(props: PostProps) {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={props.author.avatar_url} />

          <div className={styles.authorInfo}>
            <strong>{props.author.name}</strong>
            <span>{props.author.role}</span>
          </div>
        </div>

        <time title='11 de Maio às 08:13h' dateTime='2022-05-11 08:13:50'>Publicado há 1h</time>
      </header>

      <div className={styles.content}>
        {props.contents.map(content => {
          return (
            content.type === 'paragraph'
              ?
                <p>
                  {content.content}
                </p>
              :
                content.type === 'hashtag'
                  ?
                    <p>
                      {
                        content.content.split(' ').map(hashtag => {
                          return (
                            <a href="#">{hashtag}</a>
                          )
                        })
                      }
                    </p>
                  :
                    <p>
                      <a href="#">
                        {content.content}
                      </a>
                    </p>
          );
        })}
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder='Deixe um comentário'
        />

        <footer>
          <button type='submit'>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        <Comment />
      </div>
    </article>
  );
}
