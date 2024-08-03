import "./globals.css";
import { Provider } from "react-redux";
import { wrapper } from "../store";

export const metadata = {
  title: "Simple TodoApp",
  description: "simple todo app for learning next js 13",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* <Provider store={wrapper.useWrappedStore({}).store}> */}
        <body>{children}</body>
      {/* </Provider> */}
    </html>
  );
}

// export default wrapper.withRedux(RootLayout);
