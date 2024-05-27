export default function Fonts() {
   const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

   console.log({ prefix });

   return (
      <style
         dangerouslySetInnerHTML={{
            __html: `
            @font-face {
              font-family: 'Inter';
              font-style: italic;
              font-weight: 400;
              font-display: swap;
              src: url('${prefix + '/fonts/inter/Inter-Italic.ttf'}') format('truetype');
            }
            
            @font-face {
              font-family: 'Inter';
              font-style: italic;
              font-weight: 700;
              font-display: swap;
              src: url('${prefix + '/fonts/inter/Inter-BoldItalic.ttf'}') format('truetype');
            }
            
            @font-face {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: url('${prefix + '/fonts/inter/Inter-Regular.ttf'}') format('truetype');
            }
            
            @font-face {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 500;
              font-display: swap;
              src: url('${prefix + '/fonts/inter/Inter-Medium.ttf'}') format('truetype');
            }
            
            @font-face {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 700;
              font-display: swap;
              src: url('${prefix + '/fonts/inter/Inter-Bold.ttf'}') format('truetype');
            }
          `,
         }}
      />
   );
}
