export interface Iproduct {
    pname: string;
    pid: string;
    pstatus: 'In-Progress' | 'Dispatched' | 'Delivered';
    canReturn: 0 | 1;
    image: string;
  }

  export interface Ires<T> {
    msg : string
    data : T
  }