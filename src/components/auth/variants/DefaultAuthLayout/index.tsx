import Footer from 'components/footer/FooterAuthDefault';
function Default(props: { maincard: JSX.Element }) {
  const { maincard } = props;
  return (
    <div className="relative flex items-center justify-center px-4">
      <div className="mx-auto flex min-h-full w-full flex-col items-center justify-center pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0">
        <div className="mb-auto flex flex-col pr-5 md:pr-0 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
          {maincard}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Default;
