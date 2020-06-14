export type GertContainer = () => Element;

export type PopupMixinProps = {
  visible: boolean;
  zIndex: string | number;
  overlay?: boolean;
  lockScroll: boolean;
  lazyRender: boolean;
  overlayClass?: any;
  overlayStyle?: object | object[];
  getContainer?: string | GertContainer;
  closeOnClickOverlay?: boolean;
}
