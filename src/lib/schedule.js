const DAY_MS = 24 * 60 * 60 * 1000;

export function addDays(isoDate, days) {
  const date = new Date(`${isoDate}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function dateRange(startDate, endDate) {
  const dates = [];
  const start = new Date(`${startDate}T00:00:00.000Z`);
  const end = new Date(`${endDate}T00:00:00.000Z`);

  for (let time = start.getTime(); time <= end.getTime(); time += DAY_MS) {
    dates.push(new Date(time).toISOString().slice(0, 10));
  }

  return dates;
}

export function formatDate(isoDate) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${isoDate}T00:00:00.000Z`));
}

export function findDateSuggestions(event, participants) {
  const confirmedParticipants = participants.filter((participant) => participant.isConfirmed);

  if (
    participants.length !== event.expectedParticipantsCount ||
    confirmedParticipants.length !== participants.length
  ) {
    return {
      status: "waiting",
      originalDurationDays: event.durationDays,
      usedDurationDays: event.durationDays,
      wasShortened: false,
      suggestions: [],
    };
  }

  for (let duration = event.durationDays; duration >= 1; duration -= 1) {
    const suggestions = findSuggestionsForDuration(event, participants, duration);

    if (suggestions.length > 0) {
      return {
        status: "ready",
        originalDurationDays: event.durationDays,
        usedDurationDays: duration,
        wasShortened: duration !== event.durationDays,
        suggestions: suggestions.slice(0, 3),
      };
    }
  }

  return {
    status: "empty",
    originalDurationDays: event.durationDays,
    usedDurationDays: 0,
    wasShortened: false,
    suggestions: [],
  };
}

function findSuggestionsForDuration(event, participants, durationDays) {
  const unavailableDates = new Set(
    participants.flatMap((participant) => participant.unavailableDates),
  );
  const availableDates = dateRange(event.dateFrom, event.dateTo).filter(
    (date) => !unavailableDates.has(date),
  );
  const blocks = [];
  let currentBlock = [];

  availableDates.forEach((date) => {
    const previousDate = currentBlock[currentBlock.length - 1];
    const isConsecutive = !previousDate || addDays(previousDate, 1) === date;

    if (isConsecutive) {
      currentBlock.push(date);
      return;
    }

    blocks.push(currentBlock);
    currentBlock = [date];
  });

  if (currentBlock.length > 0) {
    blocks.push(currentBlock);
  }

  return blocks
    .filter((block) => block.length >= durationDays)
    .map((block) => ({
      startDate: block[0],
      endDate: addDays(block[0], durationDays - 1),
      availableBlockEndDate: block[block.length - 1],
    }));
}
