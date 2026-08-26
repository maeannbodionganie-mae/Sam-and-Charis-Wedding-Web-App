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
         <div className="relative overflow-hidden w-full" style={{ paddingBottom: '56.25%' }}>
           <iframe
             src="https://www.youtube.com/embed/2nJ7pdNnVQc?si=3PQohOnpFlxoWPWo"
             title="Sam and Charis engagement video"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
             referrerPolicy="strict-origin-when-cross-origin"
             allowFullScreen
             className="absolute top-0 left-0 w-full h-full"
           ></iframe>
         </div>

         {/* Decorative divider between the two videos */}
         <div className="relative z-20 isolate h-16 md:h-20 bg-theme-bg px-4 sm:px-6 flex items-center justify-center overflow-hidden">
           <div className="flex items-center w-full max-w-md">
             <div className="flex-1 h-px bg-gradient-to-r from-transparent via-theme-accent/25 to-theme-accent/50" />
             <img
               src="https://res.cloudinary.com/l9vkavcj/image/upload/v1786200265/Cha_and_Sam_Wed_Logo_07172026_Yellow_1_vx5jlq.png"
               alt="Sam and Charis ornament"
               className="mx-4 w-14 h-14 md:w-16 md:h-16 object-contain opacity-60 shrink-0"
             />
             <div className="flex-1 h-px bg-gradient-to-l from-transparent via-theme-accent/25 to-theme-accent/50" />
           </div>
         </div>

         <div className="relative overflow-hidden w-full" style={{ paddingBottom: '56.25%' }}>
           <iframe
             src="https://www.youtube.com/embed/ws4pdq9d6SM"
             title="Sam and Charis wedding video"
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
