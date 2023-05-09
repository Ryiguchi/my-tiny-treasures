import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../components/common/NavBar/NavBar.component';
import Box from '../../components/common/Box/Box.component';
import Footer from '../../components/common/Footer/Footer.component';
import { theme } from '../../styles/themes';

const Layout: FC = () => {
  return (
    <Box marginBottom="8rem">
      <Outlet />
      <Footer />
      <NavBar />
    </Box>
  );
};

export default Layout;
