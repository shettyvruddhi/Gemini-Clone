import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { prevPrompts, fetchPromptAnswer, setRecentPrompt } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt); // Set the selected prompt
        await fetchPromptAnswer(prompt); // Fetch the answer for the selected prompt
    };

    return (
        <div className="sidebar">
            <div className="top">
                {/* Toggle menu extension */}
                <img onClick={() => setExtended((prev) => !prev)} className="menu" src={assets.menu_icon} alt="Menu" />
                
                {/* New chat button */}
                <div className="newchat">
                    <img src={assets.plus_icon} alt="New Chat" />
                    {extended ? <p>New chat</p> : null}
                </div>
                
                {/* Recent prompts list */}
                {extended ? (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => (
                            <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                                <img src={assets.message_icon} alt="Message Icon" />
                                <p>{item}...</p>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
            
            {/* Bottom menu items */}
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="Help Icon" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="Activity Icon" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="Security Icon" />
                    {extended ? <p>Security</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
