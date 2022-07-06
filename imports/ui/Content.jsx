import React from 'react';
import {
    Routes,
    Route,
    useLocation
} from "react-router-dom";
import FadeIn from 'react-fade-in';

import { useTracker } from 'meteor/react-meteor-data';

import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';

import SignIn from './routes/AccountsForms/SignIn';
import SignUp from './routes/AccountsForms/SignUp';
import ForgotPassword from './routes/AccountsForms/ForgotPassword';
import Home from './routes/Home';
import Info from './routes/Info';
import OnlyForUnsignedUsers from './OnlyForUnsignedUsers';

export default function Content(props) {

    const drawerWidth = props.drawerWidth;

    const theme = useTheme();

    const wideOpen = useTracker(() => Session.get('sidebarWideOpened'));

    const {pathname, search} = useLocation();
    const locationForTransition = `${pathname}${search}`;

    const [displayLocation, setDisplayLocation] = React.useState(locationForTransition);
    const [transitionStage, setTransistionStage] = React.useState("fadeIn");

    React.useEffect(() => {
        if (locationForTransition !== displayLocation) setTransistionStage("fadeOut")
    }, [locationForTransition]);

    return (
        <Box component="main"
            sx={{
                flexGrow: { sm: 1 },
                transition: {
                    sm: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    })
                },
                marginLeft: { sm: 0 },
                ...(wideOpen && {
                    transition: {
                        sm: theme.transitions.create('margin', {
                            easing: theme.transitions.easing.easeOut,
                            duration: theme.transitions.duration.enteringScreen,
                        })
                    },
                    marginLeft: { sm: `${drawerWidth}px` },
                })
            }}
            
            className={transitionStage}
            onAnimationEnd={() => {
                if (transitionStage === "fadeOut") {
                    setTransistionStage("fadeIn");
                    setDisplayLocation(locationForTransition);
                }
            }}>

            <Routes location={displayLocation}>
                
                    <Route element={<OnlyForUnsignedUsers />}>

                        <Route path="/signin" element={<SignIn />} />

                        <Route path="/signup" element={<SignUp />} />

                        <Route path="/forgot_password" element={<ForgotPassword />} />

                    </Route>

                    <Route path="/dashboard" element={<Info />} />

                    <Route path="/" element={<Home />} />
                    

            </Routes>
        </Box>
    )
};