import { useRouter } from 'next/router';


export const getUserType = () => {
  const router = useRouter();

  return  (router.pathname.split('/')[2]) || localStorage.getItem('loginData').role; 
}

export const generateKey = (index,item)=>{
  return index+'_'+item.name;
}