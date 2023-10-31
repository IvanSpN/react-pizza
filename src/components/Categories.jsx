import React from 'react';

function Categories({ value, onChangeCategory }) {
  // console.log(value);
  // const [activeIndex, setActiveIndex] = useState(0);
  //Жека объяснял про onClick={() => onClickCategory(index)}

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  // const onClickCategory = (index) => {
  //   setActiveIndex(index);
  // };

  return (
    <div className="categories">
      <ul>
        {categories.map((element, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={value === index ? 'active' : ''}
          >
            {element}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
