import React from 'react';

const carData = [
    {
      title: 'Car',
      subNav: [
        {
          title: 'HONDA',
          path: 'honda',
          subNav: [
            {
              title: 'DONGFENG',
              path: 'dongfeng',
              subNav: [
                { title: 'NSPIRE', path: 'nspire' },
                { title: 'ENVIX', path: 'envix' },
                { title: 'CIVIC', path: 'civic' }
              ]
            },
            {
              title: 'GUANGQI',
              path: 'guangqi',
              subNav: [{ title: 'AVANCIER', path: 'avancier' }, { title: 'ACCORD', path: 'accord' }]
            }
          ]
        },
        {
          title: 'TOYOTA',
          path: 'toyota',
          subNav: [
            { title: 'COROLLA', path: 'corolla' },
            { title: 'CAMRY', path: 'camry' },
            { title: 'PRADO', path: 'prado' },
            { title: 'ALPHARD', path: 'alphard' }
          ]
        }
      ],
      path: 'car'
    },
    {
      title: 'Area',
      path: 'area',
      subNav: [
        {
          title: 'NORTH',
          path: 'north',
          subNav: [{ title: 'BEIJING', path: 'beijing' }, { title: 'CHANGCHU', path: 'changchu' }]
        },
        {
          title: 'SOUTH',
          path: 'south',
          subNav: [{ title: 'SHANGHAI', path: 'shanghai' }, { title: 'GUANGZHOU', path: 'guangzhou' }]
        }
      ]
    },
    {
      title: 'Country',
      path: 'country',
      subNav: [
        {
          title: 'CHINA',
          path: 'china',
          subNav: [{ title: 'MAINLAND', path: 'mainland' }, { title: 'TAIWAN', path: 'taiwan' }]
        },
        { title: 'American', path: 'american' }
      ]
    }
  ]
   

export default function Fn(){
    const path = "/dashboard/role/page/[id]";
    const pathArray = path.split("/");
    const merge = (total, item) => {
      if (item !== "[id]") {
        return total + "/" + item;
      } else {
        return total;
      }
    }
    const modify = () => {
      const temptPath = pathArray.reduce(merge);
      return temptPath;
    }
    const iteration=(data) =>{
        for (let i in data){
            if (data[i].title==='CAMRY') {
                return data[i];
            } else if (data[i].subNav && !!data[i].subNav){
                const result = iteration(data[i].subNav);
                if (!!result) return result;
            } 
        }
        return null;
    }
    return (<b>{console.log(modify())}</b>)
}
/**
 * 1. 把所有的根节点加入stack
 * 2. 从stack尾部开始
 * 3. 检查现有节点是否有children
 * 4. 如果没有打印末尾，pop一个节点
 * 5. 如果有子节点，且没有经历过，打印前半部，把子节点反着压进去
 * 6. 如果有子节点，且经历过，打印后半部，pop
 * 
 * 
 * 
 * 
 * 
 * 
 */