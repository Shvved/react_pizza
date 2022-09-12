import styles from './styled.module.scss';

const NotFoundBlock = () => {
  return (
    <h1 className={styles.root}>
      <span>:(</span>
      <br />
      Ничего не найдено
    </h1>
  );
};

export default NotFoundBlock;
