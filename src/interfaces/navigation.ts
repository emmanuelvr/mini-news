/* eslint-disable @typescript-eslint/no-explicit-any */
interface Navigation {
  navigate: (screen: string, params?: any) => void;
  getParam: (param: string) => any;
  toggleDrawer: () => void;
  goBack: () => void;
}

export default Navigation;
