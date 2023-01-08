import Header from "../header";
import { AnyProps } from "../../../types/common";

const Layout = (props: AnyProps): JSX.Element => (
  <div className="container mx-auto flex bg-card w-screen min-h-screen flex-col">
    <Header />
    {props.children}
  </div>
);

export default Layout;
