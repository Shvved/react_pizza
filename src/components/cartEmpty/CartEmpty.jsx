import { Link } from 'react-router-dom';
import cartEmptyImg from '../../assets/img/empty-cart.png';

export default function CartEmpty() {
  return (
    <div className="cart cart--empty">
      <h2>
        Корзина пустая <i>😕</i>
      </h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
}
