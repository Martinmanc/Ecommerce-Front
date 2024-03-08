import './AboutUs.css';

export default function AboutUs() {
    return (
        <>
            <main className="main-acercade">
                <h2 className="titulo-tarjeta">Acerca de Nosotros</h2>

                <p>En GameXpress, nos dedicamos apasionadamente a traerte la experiencia de juego que siempre has
                    deseado. Somos tu destino exclusivo para la adquisición de consolas de PlayStation y Xbox, abarcando desde
                    las
                    últimas innovaciones hasta las consolas clásicas que marcaron tu infancia.</p>

                <p>Nuestra misión es simple pero poderosa: conectar a los jugadores con sus sueños de juego. Con años de
                    experiencia en la industria de los videojuegos, hemos perfeccionado la forma en que puedes obtener las
                    consolas
                    de tus sueños. Ofrecemos una selección cuidadosamente curada de consolas, desde los últimos modelos de
                    PlayStation y Xbox hasta las joyas retro que despiertan nostalgia.</p>

                <p>En GameXpress, entendemos la importancia de cada consola en la historia del gaming, y nuestro
                    compromiso es mantener viva la magia de los títulos clásicos, mientras te brindamos acceso a las últimas
                    innovaciones en el mundo de los videojuegos.</p>

                <p>Nuestro equipo está compuesto por fanáticos de los videojuegos que comparten tu pasión. Estamos aquí para
                    responder a tus preguntas, ofrecer asesoramiento experto y asegurarnos de que encuentres la consola perfecta
                    que
                    se adapte a tus necesidades. Ya seas un coleccionista ávido o un jugador ocasional, estamos aquí para hacer
                    que
                    tu experiencia de compra sea excepcional.</p>

                <p>Gracias por unirte a nosotros en este viaje a través de las épocas del juego. En GameXpress,
                    estamos comprometidos a brindarte acceso a las consolas más icónicas y emocionantes de la historia de los
                    videojuegos. ¡Prepárate para jugar!</p>
            </main>
            <div className="tarjeta">
                <h2 className="titulo-tarjeta">
                    Creador de la pagina
                </h2>
                <p>Hola, soy Martin Mancini, tengo 18 años, estudiante de programación Full Stack Developer en Educacion IT y
                    creador de la página web.</p>
                <h2 className="titulo2-tarjeta">
                    Contacto
                </h2>

                <ul className="ul-tarjeta">
                    <li className="li-tarjeta">
                        <a className="a-tarjeta" href="https://api.whatsapp.com/send?phone=5493364203090">+54 9 3364203090</a>
                    </li>
                    <li>
                        <a className="a-tarjeta" href="mailto:martinmancini05@gmail.com">martinmancini05@gmail.com</a>
                    </li>
                </ul>
            </div>
        </>
    );
}
