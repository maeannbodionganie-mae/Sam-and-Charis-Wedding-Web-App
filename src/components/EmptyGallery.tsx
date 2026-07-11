import { weddingData } from '../data/weddingData';
import SectionDivider from './SectionDivider';

export default function EmptyGallery() {
  const images = weddingData.gallery;

  return (
    <section className="relative pb-12 pt-2 md:pb-20 md:pt-4 overflow-hidden">
      {/* Blurred Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-110 filter blur-xl" 
        style={{ backgroundImage: `url(${images[0].url})` }}
      />
      <div className="absolute inset-0 bg-theme-bg/60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-theme-bg/60" />
      
      {/* Shared Divider over the blurred background */}
      <div className="relative z-10 px-4 sm:px-6">
        <SectionDivider withLogo={true} />
      </div>
      
      {/* Content */}
      <div className="w-full relative z-10 mt-4">
         <div className="relative overflow-hidden w-full shadow-2xl border-y border-theme-accent/20" style={{ paddingBottom: '56.25%' }}>
           <iframe
             src="https://www.youtube.com/embed/HD0aFEQlrkA?si=k8eVywH3yXUNvT6g"
             title="YouTube video player"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
             referrerPolicy="strict-origin-when-cross-origin"
             allowFullScreen
             className="absolute top-0 left-0 w-full h-full"
           ></iframe>
         </div>
      </div>
    </section>
  );
}
