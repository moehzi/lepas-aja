import React, { useState, useEffect } from 'react';
import { CardHistory } from '../../components/CardHistory';
import { getGiveawayHistory } from '../../services/api';
import Pagination from '../../components/Pagination';
import { useUser } from '../../context/user';
import moment from 'moment';
import { Box, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';
import Button from '@mui/material/Button';

const HistoryRoom = () => {
  const [history, setHistory] = useState([]);
  const user = useUser();
  const [token, setToken] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [historyPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  //   Get current index
  const indexOfLastHistory = currentPage * historyPage;
  const indexOfFirstHistory = indexOfLastHistory - historyPage;
  const currentHistory = history.slice(indexOfFirstHistory, indexOfLastHistory);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setToken(user.token);
    if (token) {
      getGiveawayHistory(token).then((data) => {
        setHistory(data);
        setIsLoading(false);
      });
    }
  }, [token]);
  return (
    <div className="min-h-[80vh] container mx-auto text-lg text-red-600 max-w-[1050px] rounded-[10px] border border-[#C4C4C4] my-4 p-4">
      <div className="w-full flex justify-between">
        <Link href="/">
          <Button
            className="justify-start left-0 text-red-600 gap-4"
            variant="text"
          >
            <BiArrowBack /> Kembali ke beranda
          </Button>
        </Link>
        <div className="inline-flex justify-end gap-4">
          <Link href="/profile">
            <a className="p-1">Biodata</a>
          </Link>
          <Link href="/profile/my-room">
            <a className="p-1 hover:bg-slate-100 hover:rounded-lg duration-300">
              Room Saya
            </a>
          </Link>
          <Link href="/profile/giveaway-history">
            <a className="underline underline-offset-8  p-1 hover:bg-slate-100 hover:rounded-lg duration-300">
              Riwayat
            </a>
          </Link>
        </div>
      </div>
      <h1 className="text-3xl font-semibold">Riwayat Join Room</h1>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      ) : history.length == 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <h1 className="text-lg">
            Belum ada undian yang selesai untuk saat ini...
          </h1>
        </Box>
      ) : (
        <div className="max-w-[950px] mt-8 mx-auto">
          {currentHistory.map((item, index) => {
            return (
              <CardHistory
                isWinner={item.isWinner}
                key={index}
                date={moment
                  .unix(item.createdAt)
                  .locale('id')
                  .format('DD MMMM YYYY')}
                roomDesc={item.as}
                src={item.photoUrl}
                owner={item.owner}
                title={item.name}
              />
            );
          })}
          <Pagination
            historyPerPage={historyPage}
            totalHistory={history.length}
            paginate={paginate}
          />
        </div>
      )}
    </div>
  );
};

export default HistoryRoom;
