import { useBackTest } from '@/store/zustand';
import Record from '@ch20026103/backtest/dist/esm/record';
import { useCallback } from 'react';

export default function useCsv() {
  const { context } = useBackTest();

  const uuid = useCallback(() => {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return (
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4()
    );
  }, []);

  const formatCsv = useCallback((record: Record) => {
    if (record?.history) {
      let list = record.history.map((item: any) => {
        let obj = [
          item.buy['id'],
          item.buy['t'],
          item.sell['t'],
          item.buy['buyPrice'],
          item.sell['sellPrice'],
          item.sell['sellPrice'] - item.buy['buyPrice'],
          item.buy['detail'].replace(/,/g, ' | '),
          item.sell['detail'].replace(/,/g, ' | '),
        ].join(',');
        return obj;
      });
      list.push(`, , , , , , , \n`);
      let header =
        '股票代碼,買進時間,賣出時間,買進金額,賣出金額,損益,買進原因,賣出原因\n';
      let content = list.join('\n');
      let header2 = '已結算損益,獲利筆數,虧損筆數,勝率,庫存數\n';
      let content2 =
        [
          record.profit,
          record.win,
          record.lose,
          record.win / (record.win + record.lose),
          Object.keys(record.inventory).length,
        ].join(',') + '\n';
      return header + content + header2 + content2;
    }
  }, []);

  const createCsvFile = useCallback((name: string, list: string) => {
    let fileName = `${name}.csv`; //匯出的檔名
    let data = list;
    let link = document.createElement('a');
    document.body.appendChild(link);
    link.download = fileName;
    link.href = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURI(data);
    link.click();
  }, []);

  const downloadCsv = useCallback(() => {
    if (!context) return;
    let csv = formatCsv(context?.record);
    if (!csv) return;
    createCsvFile(uuid(), csv);
  }, [formatCsv, createCsvFile, uuid, context]);

  return { downloadCsv };
}
