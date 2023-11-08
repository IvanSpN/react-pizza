import React from 'react';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slice/filterSlice';
import axios from 'axios';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import { Sort } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../Pagination';
import { sortList } from '../components/Sort';

import { selectFilter } from '../redux/slice/filterSlice';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { fetchPizzas, selectPizzaData } from '../redux/slice/pizzasSlice';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  // const [items, setItems] = useState([]); - вынесли бизнес логику в Redux
  // const [isLoading, setIsLoading] = useState(true);- вынесли в Redux
  // const [currentPage, setCurrentPage] = useState(1);

  // const [categoryId, setCategoryId] = useState(0);
  // const [sortType, setSortType] = useState({
  //   name: 'популярности',
  //   sortProperty: 'rating',
  // });

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  //Жека объяснял про onClickCategory={(val) => onClickHandler(val)}
  // const onClickHandler = (val) => {
  //   setCategoryId(val);
  // };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };
  //Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  //Если был 1й рендер, то проверяем URL-параметры и сохраняем в Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  //Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scroll(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  //вариант для статического поиска
  // items
  //   .filter((element) => {
  //     if (element.title.toLowerCase().includes(searchValue.toLowerCase())) {
  //       return true;
  //     }
  //     return false;
  //   })

  const pizzas = items.map((element) => (
    <PizzaBlock key={element.id} {...element} />
  ));

  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          //  (val) => onClickHandler(val)
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <icon>😕</icon>
          </h2>
          <p>
            К сожалению не удалось получить пиццы. Попробуйте повторить запрос
            позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
