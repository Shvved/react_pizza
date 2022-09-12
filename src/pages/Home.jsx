import { useContext, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import QueryString from 'qs';
import { useNavigate } from 'react-router-dom';

import Sort, { sortTypeArr } from '../components/sort/Sort';
import Categories from '../components/categories/Categories';
import PizzaBlock from '../components/pizza-block/Pizza-block';
import Skeleton from '../components/pizza-block/Skeleton';
import Pagination from '../components/pagination/Pagination';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { SearchContext } from '../App';

const visibleItemsCount = 8;

const Home = () => {
  const arr = 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, pageCount, status } = useSelector((state) => state.pizzasReducer);
  const { activeCategory, sort, currentPage } = useSelector((state) => state.filterReducer);
  const sortBy = sort.sortProperty;

  //стейты
  const { searchValue } = useContext(SearchContext);

  //запросы
  const category = activeCategory > 0 ? `category=${activeCategory}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';

  //массивы данных
  const pizzasArray = items.map((value) => <PizzaBlock key={value.id} {...value} />);
  const skeletons = [...new Array(visibleItemsCount)].map((_, index) => <Skeleton key={index} />);

  const onChangePage = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };
  const getPizzas = async () => {
    //dispatch(setPageCount(Math.round(data.count / visibleItemsCount)));
    dispatch(
      fetchPizzas({
        currentPage,
        sortBy,
        category,
        search,
        visibleItemsCount,
      }),
    );

    window.scrollTo(0, 0);
  };

  // если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = QueryString.stringify({
        sortProperty: sort.sortProperty,
        activeCategory,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCategory, sort.sortProperty, currentPage]);

  // если был первый рендер, то проверяем url-параметры и сохраняем в redux
  useEffect(() => {
    if (window.location.search) {
      const params = QueryString.parse(window.location.search.substring(1));
      const sort = sortTypeArr.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          sort,
          ...params,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // если был	 первый	рендер, то запрашиваем пиццы
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
  }, [activeCategory, sort.sortProperty, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={activeCategory}
          onClickCategory={(index) => dispatch(setCategoryId(index))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Упс! Произошла ошибка</h2>
          <p>Пожалуйста, повторите запрос еще раз</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzasArray}</div>
      )}
      <Pagination onChangePage={onChangePage} pageCount={pageCount} />
    </div>
  );
};

export default Home;
