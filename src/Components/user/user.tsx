import { Agent } from '../../Models/AgentInterface';
import "./user.css";
import creditIcon from "/assets/icons/credits.svg";
import fleetIcon from "/assets/icons/ship.svg";

interface UserComponentProps {
	user: Agent | null;
}

const User: React.FC<UserComponentProps> = ({ user }) => {
	return (
		<>
			{user ? (
				<div className='user'>
					<h3 className='user__symbol'>{user.symbol}</h3>
					<div className='user__infos'>
						<div className='user__creditsWrapper'>
							<img className='user__creditIcon' src={creditIcon} alt="credits" />
							<span className='user__credits'>{user.credits}</span>
						</div>
						<div className='user__fleetWrapper'>
							<img className='user__fleetIcon' src={fleetIcon} alt='' />
							<span className='user__shipCount'>{user.shipCount} ships</span>
						</div>

					</div>
				</div>
			) : (
				<div className='user loading'>
					<div className='loader'></div>
				</div>
			)}
		</>
	);
};

export default User;