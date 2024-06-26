import Head from 'next/head';
import { BackgroundProps } from '@/types';

const Background: React.FC<BackgroundProps> = ({ src, children }) => {
  return (
    <>
      <Head>
        <link rel="preload" as="image" href={src} />
      </Head>
      <div
        className="
                    relative
                    inset-0
                    lg:inset-auto
                    bg-center 
                    bg-cover
                    bg-no-repeat
                    w-auto 
                    h-auto
                    transition
                    duration-500
                    overflow-x-hidden
                "
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 128, 0, 0.7), rgba(0, 0, 255, 0.7)), url(${src})`,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Background;
