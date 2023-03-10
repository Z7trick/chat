import { useState, useEffect } from "react";
import FriendsList from "../components/FriendsList/FriendsList";
import MainChat from "../components/MainChat/MainChat";
import Sidebar from "../components/Sidebar/Sidebar";
import { useAppDispatch } from "../hooks/hooks";
import { chatActions } from "../redux/slices/chatSlice";
const ChatPage = () => {
    const [active, setActive] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(chatActions.startConnecting());
    }, []);
    return (
        <div className="flex w-full h-full bg-primary">
            <Sidebar setActive={setActive} />
            <FriendsList setActive={setActive} active={active} />
            <MainChat active={active} />
        </div>
    );
};

export default ChatPage;
