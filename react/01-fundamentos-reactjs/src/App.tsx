import { Post, PostProps } from './components/Post/Post'
import { Header } from './components/Header/Header'
import { Sidebar } from './components/Sidebar/Sidebar';

import './global.css';
import styles from './App.module.css';

const posts: PostProps[] = [
  {
    id: 1,
    author: {
      name: 'Rosivaldo',
      role: 'Backend Developer',
      avatar_url: 'https://github.com/Rosivaldo-Lucas.png'
    },
    contents: [
      { type: 'paragraph', content: 'Olá galera' },
      { type: 'paragraph', content: 'Estou iniciando com ReacJS' },
      { type: 'link', content: '@rosivaldolucas' },
      { type: 'hashtag', content: '#java #typescript #reactjs #nodejs' },
    ],
    publishedAt: new Date()
  },
  {
    id: 2,
    author: {
      name: 'Lucas',
      role: 'Frontend Developer',
      avatar_url: 'https://github.com/Rosivaldo-Lucas.png'
    },
    contents: [
      { type: 'paragraph', content: 'Olá galera' },
      { type: 'paragraph', content: 'Sou especialista em Frontend ReactJS' },
      { type: 'link', content: '@rosivaldolucas' },
    ],
    publishedAt: new Date('2024-01-31 15:50:00')
  }
];

export function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                id={post.id}
                author={post.author}
                contents={post.contents}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>
      </div>
    </>
  )
}
