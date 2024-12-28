import './style.css';
export default function LinkDrop({nomeLink, href, icon: Icon}) {
    return (
        <a href={href} className="linkDrop">
            {Icon && <Icon />} 
            <span>{nomeLink}</span>
        </a>
    )
}