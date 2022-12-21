import React, {useEffect , useState} from 'react';
import { bankListAPI } from './bankListSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';

import { DataGrid, GridRowsProp , GridColDef ,GridToolbar } from '@mui/x-data-grid';



export function BankList() {

    let [bankCheckList, setBankCheckList] = useState([]);
    let [checkedList, setCheckedList] = useState({});

    const rows: GridRowsProp = [
        { id: 1, col1: 'Hello', col2: 'World' },
        { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
        { id: 3, col1: 'MUI', col2: 'is Amazing' },
    ];
    
    const columns: GridColDef[] = [
      { field: 'col1', headerName: 'Column 1', width: 150 },
      { field: 'col2', headerName: 'Column 2', width: 150 },
    ];

    const dispatch = useAppDispatch();
    const bankLists = useAppSelector((state) => state.bankList);
    
    // debugger;
    
    // bankLists.map((item:any)=> console.log(item));

    useEffect(() => {
        dispatch( bankListAPI());
        // setBankCheckList(bankLists);
        // console.log(bankLists);
        // console.log(...bankCheckList);
    }, [])



    return (
        <div style={{width: '100%' }}>
            {/* <DataGrid rows={rows} columns={columns} /> */}
            {/* 사용법 : https://mui.com/material-ui/react-list/#folder-list */}
            <List
                 sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                 subheader={<ListSubheader>은행 목록</ListSubheader>}
                >
            
                {bankLists.bankList.map((item,index) => {
                 
                 return (
                 <ListItem key={index}>
                    {/* 아이콘 영역 */}
                    <ListItemText id="switch-list-label-wifi" primary={item.kor_co_nm} />
                    <Switch 
                         edge="end"
                         checked={true}
                    />
                 </ListItem>
                 )
                })}
            </List>
        </div>
    );
};
