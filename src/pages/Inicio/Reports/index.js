import React, { useEffect, useState } from 'react';

import { ReportsData } from '~/components/ReportsData';
import Api from '~/services/Api';
import { convertWeekDay, revertDate } from '~/utils/weekDay';

import { Container, Selector, SelectorView } from './styles';

export const Reports = () => {
  const types = [
    'Banco de horas',
    'Horas trabalhadas',
    'Carga horária',
    'Atrasos',
    'Faltas',
    'Horas noturnas',
    'Horas extras',
    'Horas extras noturnas',
  ];
  const [type, setType] = useState(types[0]);
  const [annualLeave, setAnnualLeave] = useState({});
  const [workedHours, setWorkedHours] = useState({});
  const [workload, setWorkload] = useState({});
  const [delays, setDelays] = useState({});
  const [absences, setAbsences] = useState({});
  const [nightHours, setNightHours] = useState({});
  const [overtime, setOvertime] = useState({});
  const [nightOvertime, setNightOvertime] = useState({});

  useEffect(() => {
    const bootstrap = async () => {
      const response = await Api.gethours();
      const annualLeaveData = response.map((item) => {
        return {
          date: `${revertDate(item.data)}`,
          weekDay: `${convertWeekDay(item.data)}`,
          hour: item.banco_horas_saldo,
        };
      });
      const workedHoursData = response.map((item) => {
        return {
          date: `${revertDate(item.data)}`,
          weekDay: `${convertWeekDay(item.data)}`,
          hour: item.workedHours,
        };
      });
      const workloadData = response.map((item) => {
        return {
          date: `${revertDate(item.data)}`,
          weekDay: `${convertWeekDay(item.data)}`,
          hour: item.carga,
        };
      });
      const delaysData = response.map((item) => {
        return {
          date: `${revertDate(item.data)}`,
          weekDay: `${convertWeekDay(item.data)}`,
          hour: item.atraso,
        };
      });
      const absencesData = response.map((item) => {
        return {
          date: `${revertDate(item.data)}`,
          weekDay: `${convertWeekDay(item.data)}`,
          hour: item.falta,
        };
      });
      const nightHoursData = response.map((item) => {
        return {
          date: `${revertDate(item.data)}`,
          weekDay: `${convertWeekDay(item.data)}`,
          hour: item.total_noturno_trabalhado,
        };
      });
      const overtimeData = response.map((item) => {
        return {
          date: `${revertDate(item.data)}`,
          weekDay: `${convertWeekDay(item.data)}`,
          hour: item.extra,
        };
      });
      const nightOvertimeData = response.map((item) => {
        return {
          date: `${revertDate(item.data)}`,
          weekDay: `${convertWeekDay(item.data)}`,
          hour: item.extra_noturno,
        };
      });
      setAnnualLeave({
        type: 'Banco de horas',
        data: [...annualLeaveData],
      });

      setWorkedHours({
        type: 'Horas trabalhadas',
        data: [...workedHoursData],
      });

      setWorkload({
        type: 'Carga horária',
        data: [...workloadData],
      });

      setDelays({
        type: 'Atrasos',
        data: [...delaysData],
      });

      setAbsences({
        type: 'Faltas',
        data: [...absencesData],
      });

      setNightHours({
        type: 'Horas noturnas',
        data: [...nightHoursData],
      });

      setOvertime({
        type: 'Horas extras',
        data: [...overtimeData],
      });

      setNightOvertime({
        type: 'Horas extras noturnas',
        data: [...nightOvertimeData],
      });
    };
    bootstrap();
  }, []);

  return (
    <Container>
      <Selector>
        <SelectorView
          dropdownIconColor="#ffffff"
          dropdownIconRippleColor="#1cade2"
          selectedValue={type}
          mode={'dropdown'}
          onValueChange={(indexSelected) => setType(types[indexSelected])}
        >
          {types.map((item) => (
            <SelectorView.Item
              style={{ backgroundColor: '#1cade2' }}
              color="#ffffff"
              key={item}
              label={item}
              value={item}
            />
          ))}
        </SelectorView>
      </Selector>
      {annualLeave.type === type && <ReportsData data={annualLeave.data} />}
      {workedHours.type === type && <ReportsData data={workedHours.data} />}
      {workload.type === type && <ReportsData data={workload.data} />}
      {delays.type === type && <ReportsData data={delays.data} />}
      {absences.type === type && <ReportsData data={absences.data} />}
      {nightHours.type === type && <ReportsData data={nightHours.data} />}
      {overtime.type === type && <ReportsData data={overtime.data} />}
      {nightOvertime.type === type && <ReportsData data={nightOvertime.data} />}
    </Container>
  );
};
