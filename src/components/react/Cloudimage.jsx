import Img, { CloudimageProvider } from 'react-cloudimage-responsive-plain';

const cloudimageConfig = {
  token: 'ajrctguoxo',
  lazyLoading: true
};

export default function MySidebar(props) {
  return (
    <CloudimageProvider config={cloudimageConfig}>
      <Img src={props.src} params="org_if_sml=0&force_format=webp,jpeg&func=crop&gravity=face"/>
    </CloudimageProvider>
  );
};
