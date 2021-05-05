import React, { useState } from "react";
import moment from "moment";
import Calendar from "tui-calendar";

import {
  Layer,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  TextInput,
  TextArea,
  Text,
  DateInput,
  Grid,
  MaskedInput,
} from "grommet";

import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

export const Calendario = () => {
  const [show, setShow] = useState(false);
  const today = moment().toDate().toISOString();
  const [time, setTime] = useState("");
  const [nombre, setNombre] = useState("Nicolás González");
  const [req, setReq] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [idc, setIdc] = useState(1);
  const [schedule, setSchedule] = useState([
    {
      id: "1",
      calendarId: "1",
      title: "Horario Protegido",
      color: "#000000",
      bgColor: "#9e5fff",
      dragBgColor: "#9e5fff",
      borderColor: "#9e5fff",
      category: "time",
      dueDateClass: "",
      start: moment({ hour: 12 }).weekday(4).toDate(),
      end: moment({ hour: 14 }).weekday(4).add(10, "minutes").toDate(),
      isReadOnly: true,
    },
  ]);

  function getPadStart(value) {
    value = value.toString();
    return value.padStart(2, "0");
  }

  const templates = {
    weekDayname: function (model) {
      return (
        '<span class="tui-full-calendar-dayname-date">' +
        model.date +
        '</span>&nbsp;&nbsp;<span class="tui-full-calendar-dayname-name">' +
        model.dayName +
        "</span>"
      );
    },
    weekGridFooterExceed: function (hiddenSchedules) {
      return "+" + hiddenSchedules;
    },
    collapseBtnTitle: function () {
      return '<span class="tui-full-calendar-icon tui-full-calendar-ic-arrow-solid-top"></span>';
    },
    timezoneDisplayLabel: function (timezoneOffset, displayLabel) {
      var gmt, hour, minutes;

      if (!displayLabel) {
        gmt = timezoneOffset < 0 ? "-" : "+";
        hour = Math.abs(parseInt(timezoneOffset / 60, 10));
        minutes = Math.abs(timezoneOffset % 60);
        displayLabel = gmt + getPadStart(hour) + ":" + getPadStart(minutes);
      }
      return displayLabel;
    },
    timegridDisplayPrimayTime: function (time) {
      /* will be deprecated. use 'timegridDisplayPrimaryTime' */
      var hour = time.hour;
      var meridiem = hour >= 12 ? "pm" : "am";

      if (hour > 12) {
        hour = hour - 12;
      }

      return hour + " " + meridiem;
    },
    timegridDisplayPrimaryTime: function (time) {
      var hour = time.hour;
      var meridiem = hour >= 12 ? "pm" : "am";

      if (hour > 12) {
        hour = hour - 12;
      }

      return hour + " " + meridiem;
    },
    timegridDisplayTime: function (time) {
      return getPadStart(time.hour) + ":" + getPadStart(time.hour);
    },
  };

  const COMMON_CUSTOM_THEME = {
    "common.border": "1px solid #ffbb3b",
    "common.backgroundColor": "#ffbb3b0f",
    "common.holiday.color": "#f54f3d",
    "common.saturday.color": "#3162ea",
    "common.dayname.color": "#333",
  };

  let WeekCalendar = new Calendar("#calendar", {
    theme: COMMON_CUSTOM_THEME,
    defaultView: "week",
    taskView: false,
    useDetailPopup: true,
    template: templates,
    week: {
      daynames: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ],
      workweek: true,
      hourStart: 8,
      hourEnd: 21,
    },
  });

  WeekCalendar.createSchedules(schedule);

  WeekCalendar.on({
    clickSchedule: function (e) {
      console.log("clickSchedule", e);
    },
    beforeCreateSchedule: function (e) {
      setShow(true);

      setStartHour(
        moment({
          day: e.start.getDay() + 2,
          hours: e.start.getHours(),
          minutes: e.start.getMinutes(),
        }).toDate()
      );
      setSelectedDay(e.start.getDay() + 2);
      /*const title = prompt("Schedule", "@suvrity's birthday");
      var schedule = {
        id: +new Date(),
        title: title,
        isAllDay: true,
        start: e.start,
        end: e.end,
        category: "allday",
      };
      /* step2. save schedule */
      //WeekCalendar.createSchedules([schedule]);
      /* step3. clear guide element */
      // e.guide.clearGuideElement();
      //console.log("beforeCreateSchedule", e);
      // open a creation popu
    },
    beforeUpdateSchedule: function (e) {
      console.log("beforeUpdateSchedule", e);
      e.schedule.start = e.start;
      e.schedule.end = e.end;
      WeekCalendar.updateSchedule(
        e.schedule.id,
        e.schedule.calendarId,
        e.schedule
      );
    },
    beforeDeleteSchedule: function (e) {
      console.log("beforeDeleteSchedule", e);
      WeekCalendar.deleteSchedule(e.schedule.id, e.schedule.calendarId);
    },
  });

  const handleTodayDate = (event) => {
    console.log(event);
  };

  const handleAddSchedule = () => {
    setShow(false);
    const tiempos = time.split(":");
    const hora = parseInt(tiempos[0], 10);
    const minutos = parseInt(tiempos[1], 10);
    //const dia = moment(selectedDay).day();
    moment({ day: selectedDay, hour: hora, minutes: minutos }).toDate();

    setIdc(idc + 1);
    const newSchedule = {
      id: idc + "",
      calendarId: idc + "",
      title: nombre,
      color: "#000000",
      bgColor: "#9e5fff",
      dragBgColor: "#9e5fff",
      borderColor: "#9e5fff",
      category: "time",
      dueDateClass: "",
      start: startHour,
      end: moment({
        day: selectedDay,
        hour: hora,
        minutes: minutos,
      }).toDate(),
      isReadOnly: true,
    };
    setSchedule([...schedule, newSchedule]);
    //console.log(WeekCalendar.getSchedule());
    WeekCalendar.createSchedules(schedule);
  };

  return (
    <>
      <Box align="start">
        {show && (
          <Layer
            onEsc={() => setShow(false)}
            onClickOutside={() => setShow(false)}
          >
            <Card background="light-1">
              <CardHeader
                pad={{ horizontal: "medium" }}
                margin={{ top: "1rem" }}
              >
                <Grid
                  rows={["xxsmall", "xxsmall"]}
                  columns={["10rem", "10rem"]}
                  gap="small"
                  areas={[
                    { name: "header", start: [0, 0], end: [1, 0] },
                    { name: "nav", start: [0, 1], end: [1, 1] },
                  ]}
                >
                  <Box gridArea="header" background="light-2">
                    <TextInput value={nombre}></TextInput>
                  </Box>
                  <Box gridArea="nav" background="light-2">
                    <TextArea
                      resize={false}
                      placeholder="Ingrese sus requerimientos"
                      value={req}
                      onChange={(e) => {
                        setReq(e.target.value);
                      }}
                    ></TextArea>
                  </Box>
                </Grid>
              </CardHeader>

              <CardBody
                pad="medium"
                margin={{ top: "xxsmall", bottom: "2rem" }}
              >
                <Grid
                  rows={["xsmall", "xsmall"]}
                  columns={["10rem", "10rem"]}
                  gap="small"
                  areas={[
                    { name: "nav", start: [0, 0], end: [0, 0] },
                    { name: "main", start: [1, 0], end: [1, 0] },
                    { name: "hh", start: [0, 1], end: [1, 1] },
                  ]}
                >
                  <Box gridArea="nav" background="light-2">
                    <Text>Desde</Text>
                    <DateInput
                      format="dd/mm/yyyy"
                      value={today}
                      onChange={handleTodayDate}
                      inline={false}
                    />
                  </Box>
                  <Box gridArea="main" background="light-2">
                    <Text>Hasta</Text>
                    <DateInput
                      format="dd/mm/yyyy"
                      value={moment().add(1, "week").toDate().toISOString()}
                      onChange={({ value }) => {}}
                      inline={false}
                    />
                  </Box>
                  <Box gridArea="hh" background="light-2">
                    <Text>Hasta</Text>
                    <MaskedInput
                      mask={[
                        {
                          length: [1, 2],
                          options: [
                            "9:30",
                            "10:40",
                            "11:50",
                            "13:00",
                            "14:10",
                            "15:20",
                            "16:30",
                            "17:40",
                            "18:50",
                            "20:00",
                          ],
                          regexp: /^1[1-2]$|^[0-9]$/,
                        },
                      ]}
                      value={time}
                      onChange={(event) => {
                        setTime(event.target.value);
                      }}
                    />
                    <br></br>
                    <Button
                      label="Confirmar reserva"
                      onClick={handleAddSchedule}
                    />
                  </Box>
                </Grid>
              </CardBody>
            </Card>
          </Layer>
        )}
      </Box>
    </>
  );
};
