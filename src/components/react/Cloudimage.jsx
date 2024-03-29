import Img, { CloudimageProvider } from 'react-cloudimage-responsive-plain';

const cloudimageConfig = {
  token: 'ajrctguoxo',
  lazyLoading: true,
  devicePixelRatioList: [1],
  presets: {
    xs: '(max-width: 639px)', 
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)', 
    lg: '(min-width: 1024px)', 
    xl: '(min-width: 1280px)' 
}
};

export default function MySidebar(props) {
  return (
    <CloudimageProvider config={cloudimageConfig}>
      <Img src={props.src} params={props.params} className="w-full h-full"/>
    </CloudimageProvider>
  );
};
