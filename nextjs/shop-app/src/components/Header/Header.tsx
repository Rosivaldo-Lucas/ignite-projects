import Image from 'next/image';

import logoImg from '@/assets/logo.svg';

import { Container, ContainerHeader } from './styles';

export default function Header() {
  return (
    <Container>
      <ContainerHeader>
        <Image src={logoImg} alt='' width={300} height={300} />
      </ContainerHeader>
    </Container>
  );
}
